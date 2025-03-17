from fastapi import FastAPI
from app.routers import auth, public, protected
from app.database import engine, Base
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()  # Load environment variables

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(public.router, prefix="/api/public", tags=["public"])
app.include_router(protected.router, prefix="/api/protected", tags=["protected"])
