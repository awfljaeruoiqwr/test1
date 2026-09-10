# KIA TIGERS 커스텀 사이트

KIA TIGERS 사이트를 Next.js App Router로 만든 프로젝트입니다.

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

## 참고 문서
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://nextjs.org/docs/app/getting-started/installation
