from fastapi import APIRouter

router = APIRouter()

@router.get("/info")
def read_public():
    return {"message": "This is a public endpoint accessible without authentication."}
