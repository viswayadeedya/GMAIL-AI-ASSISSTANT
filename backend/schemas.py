from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Literal
from pydantic.alias_generators import to_camel

EmailType = Literal[
    "rejection",
    "assessment",
    "interview",
    "offer",
    "recruiter",
    "confirmation",
    "other",
]

Range = Literal["24h", "7d", "30d"]
Sort = Literal["newest", "oldest"]
Category = EmailType | Literal["all"]


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class EmailSummary(CamelModel):
    id: str
    sender_name: str
    company_name: str
    subject: str
    summary: str  # short preview, a line or two
    received_at: datetime
    type: EmailType
    action_needed: bool
    due_at: datetime | None = (
        None  # ISO date: due date, or "reply by" time, mentioned in the email
    )


class Email(EmailSummary):
    sender_email: str
    body: str  # the full message


class EmailQueryParams(CamelModel):
    range: Range = "7d"
    sort_order: Sort = "newest"
    category_filter: Category = "all"
    q: str | None = None  # search query, optional
    page: int = Field(default=1, ge=1)  # page number, default to 1
    page_size: int = Field(
        default=10, ge=1, le=100
    )  # number of emails per page, default to 10


class EmailPage(CamelModel):
    emails: list[Email]
    total: int = Field(ge=0)  # total number of emails matching the query
