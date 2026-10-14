from schemas import EmailQueryParams, Email
import json
from pathlib import Path
from datetime import timedelta, timezone, datetime

RANGE_DELAYS = {
    "24h": timedelta(days=1),
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
}

DATA_FILE = Path(__file__).parent.parent / "data" / "emails.json"

with open(DATA_FILE) as f:
    rows = json.load(f)

emails: list[Email] = [Email.model_validate(row) for row in rows]


async def search_emails(params: EmailQueryParams):
    reverse = params.sort_order == "newest"
    sorted_emails = sorted(emails, key=lambda x: x.received_at, reverse=reverse)
    if params.category_filter != "all":
        sorted_emails = [
            email for email in sorted_emails if email.type == params.category_filter
        ]
    cutoff_date = datetime.now(timezone.utc) - RANGE_DELAYS[params.range]
    sorted_emails = [
        email for email in sorted_emails if email.received_at >= cutoff_date
    ]
    if params.q:
        query = params.q.lower()
        sorted_emails = [
            email
            for email in sorted_emails
            if query in email.subject.lower()
            or query in email.sender_name.lower()
            or query in email.company_name.lower()
        ]
    total_emails = len(sorted_emails)
    start_index = (params.page - 1) * params.page_size
    end_index = start_index + params.page_size
    sorted_emails = sorted_emails[start_index:end_index]

    return {"emails": sorted_emails, "total": total_emails}
