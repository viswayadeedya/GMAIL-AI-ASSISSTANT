from fastapi import FastAPI, Query
from typing import Annotated
from services.email_service import search_emails
from schemas import Email, EmailPage, EmailQueryParams

app = FastAPI()


@app.get("/emails", response_model=EmailPage)
async def get_emails(emailQueryParams: Annotated[EmailQueryParams, Query()]):
    result = await search_emails(emailQueryParams)
    return result
