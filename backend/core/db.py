from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from core.config import settings

_engine = None
_async_session = None

def get_engine():
    global _engine, _async_session
    if _engine is None:
        _engine = create_async_engine(settings.DATABASE_URL, echo=False, future=True)
        _async_session = sessionmaker(_engine, class_=AsyncSession, expire_on_commit=False)
    return _engine

def get_sessionmaker():
    if _async_session is None:
        get_engine()
    return _async_session

async def get_db():
    SessionLocal = get_sessionmaker()
    async with SessionLocal() as session:
        yield session