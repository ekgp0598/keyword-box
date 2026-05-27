# 데이터 품질 리포트

## 기준

검증 대상:

- `data/dictionaries.js`
- `data/dictionaries/charades.md`
- `data/dictionaries/charades-funny.md`
- `data/dictionaries/silent-shout.md`
- `data/dictionaries/telestrations.md`

검증 명령:

```bash
node scripts/validate-data.js
```

## 개수 검증

- `charades.easy`: 100개
- `charades.normal`: 100개
- `charades.hard`: 100개
- `charadesFunny.all`: 139개
- `silentShout.easy`: 100개
- `silentShout.normal`: 100개
- `silentShout.hard`: 100개
- `telestrations.easy`: 100개
- `telestrations.normal`: 100개
- `telestrations.hard`: 100개

## 빈 제시어

빈 제시어는 없습니다.

## 중복 제시어

현재 앱 데이터 기준 중복은 아래 1건입니다.

| 사전 | 제시어 | 위치 | 판단 |
|---|---|---|---|
| 고요 속의 외침 | 드라이기 | 중급 123, 초급 95 | 수정 후보 |

`드라이기`는 초급에도 있고 중급에도 있어 실제 플레이에서 중복 출제될 수 있습니다. 원문 보존을 위해 아직 삭제하지 않았습니다.

## 긴 제시어

검증 스크립트는 18자 이상 제시어를 경고로 표시합니다. 현재 긴 제시어는 CSS의 `overflow-wrap: anywhere`와 반응형 글자 크기로 줄바꿈 처리됩니다.

대표 긴 제시어:

- 일석이조 (돌 던져 새 두 마리)
- 피자 피클인 줄 알고 할라피뇨 먹음

## 괄호 표현

괄호 표현은 현재 유지합니다.

이유:

- 설명 힌트가 포함된 제시어가 있음
- 게임 진행자가 의미를 빠르게 이해하기 좋음
- 추후 UI에서 괄호 안 문구를 보조 설명으로 분리할 수 있음

예:

- 닭 (달걀 낳는 중)
- 강아지 (오줌싸기)
- 플라밍고(홍학)

## 다음 판단 필요

- `고요 속의 외침` 중복 제시어 `드라이기`를 하나 교체할지 결정
- 괄호 안 힌트를 제시어 본문에 계속 둘지, 앱 표시에서 보조 문구로 분리할지 결정
