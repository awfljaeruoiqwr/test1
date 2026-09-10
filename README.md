# KIA TIGERS — Netlify용 프로젝트

페이지를 분리한 KIA TIGERS 사이트를 표준 Next.js App Router로 전환한 프로젝트입니다.

## GitHub에 올리기
1. ZIP 압축을 풉니다.
2. 안쪽 `kia-tigers-netlify` 폴더의 **내용물**을 GitHub 저장소에 올립니다.
3. 저장소 첫 화면에 `package.json`, `package-lock.json`, `netlify.toml`, `app` 폴더가 보여야 합니다.
   ZIP 파일 자체만 업로드하면 빌드할 수 없습니다.

## Netlify에서 빌드
1. Netlify에서 GitHub 저장소를 연결해 새 프로젝트를 가져옵니다.
2. 다음 설정을 확인합니다. `netlify.toml`에도 들어 있습니다.
   - Base directory: 비워 둠 (package.json이 저장소 루트에 있을 때)
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js: 22
3. 배포를 실행합니다. Next.js 어댑터는 Netlify가 자동 적용합니다.
4. 배포 후 경기일정, 선수 기록, 상세 주소 직접 접속을 확인합니다.

폴더째 저장소에 넣었다면 Base directory에 그 폴더명을 지정하세요.
API 서버 기능을 사용하므로 정적 파일 드래그앤드롭 배포나 `output: "export"`를 사용하지 않습니다.

## 로컬 실행
Node.js 22.13 이상이 필요합니다.

```sh
npm ci
npm run dev
```

운영 빌드를 확인하려면:

```sh
npm run build
npm start
```

기존 데이터 처리 테스트:

```sh
npm test
```

## 페이지
- `/`: 홈, 다음 경기, 구단 소개, 영상
- `/schedule`: 경기일정과 필터
- `/schedule/[id]`: 경기 상세 및 직관 플랜
- `/players`: 선수단과 검색
- `/players/[id]`: 프로필과 연도별 기록
- `/stadium`: 좌석, 예매 안내, 시설, 교통 탭

## 데이터와 배포 환경
구단 공개 서버에서 경기·선수·입장권 데이터를 가져옵니다. 별도 API 키는 필요하지 않습니다.
외부 사진, 폰트, 영상 썸네일은 원본 서버에서 로드합니다.
구단 연결 실패 시 기존 오류 안내 및 일정 저장본 처리 방식이 유지됩니다.
기존 Sites의 비공개 접근 제한은 포함되어 있지 않으므로 Netlify 공개 범위는 해당 계정에서 설정하세요.
실제 Netlify 계정 배포는 사용자가 진행해야 합니다. 로컬 검증 결과는 VERIFICATION.md에 기록합니다.

## 전환 내용
- Vinext / Cloudflare / Sites 전용 의존성과 설정 제거
- Next.js 빌드·실행 스크립트, TypeScript 및 Tailwind PostCSS 설정 적용
- Node.js 버전 및 Netlify 빌드 설정 추가
- 재현 가능한 설치를 위한 package-lock.json 포함

## 참고 문서
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://nextjs.org/docs/app/getting-started/installation
