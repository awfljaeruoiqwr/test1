# 기술 스택 및 버전

이 문서는 현재 저장소(`example/app.py`, `example/models.py`)의 코드와 실행 환경을 기준으로 정리했습니다.

## 1) Python 버전

- **프로젝트에 고정된 Python 버전:** 명시 파일 없음 (`pyproject.toml`, `requirements.txt`, `.python-version`, `runtime.txt` 부재)
- **현재 실행 환경 Python 버전:** `3.10.19`

## 2) 백엔드/프레임워크

코드 import 기준으로 확인된 사용 기술입니다.

- **Flask** (웹 프레임워크) — 버전: 프로젝트 내 미명시
- **Flask-SQLAlchemy** (ORM 확장) — 버전: 프로젝트 내 미명시
- **Werkzeug** (Flask 기반 유틸리티) — 버전: 프로젝트 내 미명시

## 3) 데이터 처리/파일 처리

- **pandas** (데이터프레임 처리) — 버전: 프로젝트 내 미명시
- **openpyxl** (엑셀 파일 생성/스타일) — 버전: 프로젝트 내 미명시

## 4) 데이터베이스

- **SQLite** (`example/db.sqlite` 파일 기반)
- SQLAlchemy 연결 문자열: `sqlite:///<project>/example/db.sqlite`

## 5) 표준 라이브러리(주요)

- `datetime`, `functools`, `io`, `os`, `re`, `zipfile`, `xml.etree.ElementTree`

## 6) 참고 사항

- 현재 환경에서 위 외부 라이브러리(Flask, pandas, openpyxl 등)는 설치되어 있지 않아 런타임 버전을 직접 조회할 수 없었습니다.
- 정확한 버전 재현을 위해서는 `requirements.txt` 또는 `pyproject.toml` 생성 후 버전 고정을 권장합니다.
