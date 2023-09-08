# More Effective Search!

[한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색창을 클론하고 그 외 캐싱 및 검색 기능을 추가한 페이지입니다

네트워크 요청은 최소화하고, 사용자에게는 편리한 "효과적인 검색"을 고민했습니다.

- [배포링크](https://cache-storage.vercel.app/)
- [원티드 프리온보딩 인턴십 8월](https://www.wanted.co.kr/events/pre_ob_fe_12)의 셋째주 과제를 수행한 결과물입니다.
- 개발 기간 : 약 4일 (2023.09.06 ~ 2023.09.08)
- 개발 인원 : [@notusing11](https://github.com/notusing11)

## 실행 방법

- 실행하기 위해서는 git과 Node.js가 설치된 환경이 필요합니다. (Node.js LTS, 18.17.0 버전 기준)
- 해당 레포지토리를 클론 후 디렉토리로 이동합니다.
- `npm install & npm start` 명령어로 실행하실 수 있습니다.

```
  git clone https://github.com/notusing11/cache-storage.git && cd cache-storage;
  npm install & npm start;
```

## 구현한 기능

### 기본 동작 clone

- 최근 검색어 최대 10개 표시
- 최근 검색어 클릭시 바로 검색 가능
- 기본 추천 검색어 클릭시 바로 검색 가능
- 검색어 입력시 검색어 기준 추천 검색어 목록 표시
- 추천 검색어 목록 요청 중 로딩 표시
- 입력된 검색어와 일치되는 부분 강조
- 검색어 지우기 기능

### 추가 기능

- api 로컬 캐싱
- 캐시 expire time 구현
- 키보드 화살표로 추천 검색어 탐색 기능
- 최근 검색어 삭제 기능
- 검색창 클릭 제어 (내부 클릭시 열림 유지 및 외부 클릭시 닫힘)

## Preview

| 이미지                                                        | 기능 설명                                                 |
| ------------------------------------------------------------- | --------------------------------------------------------- |
| ![검색창 기본동작](/docs/search-0.gif)                        | 검색창 외부 클릭시 닫힘, 검색 드롭다운 클릭시 닫히지 않음 |
| ![최근 검색어](/docs/search-1.gif)                            | 최근 검색어 최대 10개 표시                                |
| ![검색어 클릭시 바로 검색](/docs/search-2.gif)                | 검색어 클릭시 바로 검색                                   |
| ![입력어 및 최근 검색어 삭제](/docs/search-3.gif)             | 검색 입력어 및 최근 검색어 삭제                           |
| ![추천 검색어 목록 키보드 제어 및 스크롤](/docs/search-4.gif) | 추천 검색어 목록 키보드 제어 및 스크롤 따라오기           |

## 참고한 디자인 및 기본 동작 : [한국임상정보](https://clinicaltrialskorea.com/)

2023년 9월 8일 기준 UI (PC)
![한국임상정보 UI](/docs/clinicaltrialskorea.gif)

- 최근 검색어 표시
- 최근 검색어 클릭시 바로 검색 가능
- 기본 추천 검색어 클릭시 바로 검색 가능
- 검색어 입력시 검색어 기준 추천 검색어 목록 표시
- 추천 검색어 목록 표시 전 로딩
- 입력된 검색어와 일치되는 부분 강조

## 기술 스택 및 사용한 라이브러리

- Create React App (+ typescript)
- styled-components : 컴포넌트 기반 css 처리
- concurrently : npm 모듈 동시 실행용

## 폴더 구조

```
src
├── apis
├── assets
│   └── img
├── components
│   ├── commons
│   ├── recentKeyword
│   └── search
├── constants
├── contexts
├── hooks
├── types
└── utils

```

### 폴더 구조별 설명

- api : 네트워크 api 호출관련 로직
- components : 도메인별 분리
- constants : 변경 가능성이 높은 상수
- contexts : 전역 상태 등 context 정의
- hooks : api 호출과 상관없는 커스텀 훅
- types : 타입
- utils : 커스텀훅이 아닌 함수들

# 구현 방법 및 활용한 전략

## API 호출 최소화 전략

한글 특성상 글자가 여러 입력을 조합합니다. 모든 입력마다 api 호출이 이루어지면 불필요한 호출이 추가되어 비효율이 증가합니다. 다양한 방법을 통해 api 호출을 최소화하기 노력했습니다.

### Debounce 적용

사용자가 원하는 검색어를 완성하려면 어느 정도의 시간이 필요합니다. 설정된 딜레이 시간동안 추가적인 입력을 기다리면서 가장 마지막의 입력만 적용되도록 디바운싱 처리를 추가했습니다.

- useDebounce 훅 추가
  인자로 기다릴 delay시간과 최종 실행할 callback을 받아 디바운싱 처리를 해주는 함수를 반환합니다.

```typescript
// hooks/useDebounce.ts
const useDebounce = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const debounce = useCallback((callbackFunction: () => void, delay: number) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callbackFunction();
      timer.current = null;
    }, delay);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return debounce;
};
```

- 검색과정에서 debounce 함수 활용

추천 검색어를 가져오는 api 호출 과정을 debounce의 콜백으로 넘겨 여러번의 요청에 대응할 수 있도록 처리했습니다.

```typescript
// hooks/useSearch.ts 13:26
  const debounce = useDebounce();
  const searchRecommends = (keyword: string) => {
    ...
    debounce(() => {
      getSick(keyword).then((response) => {
        setRecommends(response);
        setIsLoading(false);
      });
    }, 500);
  };
```

### 로컬 캐싱

최근 검색어 등 이전에 호출한 api를 다시 호출하는 경우 지난 요청을 다시 활용할 수 있도록 처리했습니다. 브라우저의 cache storage API를 통해 요청에 따른 응답을 저장하며 매 응답의 expire time을 확인하여 아직 유효한 데이터인지 판별하고 있습니다.

- api 호출하기 전 캐시에 저장된 데이터와 그 유효성을 확인하고 있습니다. 캐시가 존재하지 않거나 유효하지 않을 경우에만 api 호출을 하고 콘솔에 요청 사실을 알리고 있습니다. 마찬가지로 이후의 호출에 대비해서 유효기간을 설정하고 캐시에 저장해서 활용할 수 있도록 대비합니다.

```typescript
// utils/fetcher.ts
const fetcher = async (uri: string): Promise<Sick[]> => {
  const { getCache, setCache, deleteCache } = await cache();
  const cachedData = await getCache(uri);

  if (cachedData) {
    if (isFreshCache(cachedData)) {
      return cachedData.json();
    }
    deleteCache(uri);
  }

  const freshData = await fetch(BASE_URL + uri, { headers: BASIC_HEADERS });
  console.info('calling api');

  const cachingData = setCacheExpireTime(freshData);
  setCache(uri, cachingData);

  return freshData.json();
};
```

- 캐시 처리를 담당하는 쪽에서는 캐시 스토리지에서 조회, 갱신, 삭제하는 로직과 유효일자 저장 및 확인하는 로직을 포함합니다. 유효일자는 Date 객체의 getTime() 메서드를 활용해서 숫자로 변환했습니다.

```typescript
// utils/cache.ts
const cache = async () => {
  const cacheStroage = await caches.open(CACHE_KEY);

  const setCache = (key: string, response: Response) => cacheStroage.put(key, response);
  const getCache = async (key: string) => await cacheStroage.match(key);
  const deleteCache = async (key: string) => await cacheStroage.delete(key);

  return { setCache, getCache, deleteCache };
};

export const setCacheExpireTime = (freshData: Response) => {
  const expireTime = new Date().getTime() + CACHE_MAX_AGE;
  return new Response(freshData.clone().body, {
    headers: {
      ...BASIC_HEADERS,
      [EXPIRE_HEADER]: expireTime.toString(),
    },
  });
};

export const isFreshCache = (cachedResponse: Response) => {
  const cachedExpire = cachedResponse.headers.get(EXPIRE_HEADER);
  return cachedExpire && new Date().getTime() > +cachedExpire;
};
```

## 기타 편의기능 1. 키보드 방향키로 추천검색어 선택

입력어에 따른 추천 검색어 목록을 마우스뿐만 아니라 키보드로도 선택하고 검색을 진행할 수 있습니다. 목록이 긴 경우에는 선택하는 부분에 스크롤이 따라와서 사용자의 선택을 돕고 있습니다. 추천 목록을 표시할 때 keydown 이벤트를 등록해서 키보드 입력을 받을 수 있도록 처리했습니다.

- 컴포넌트 마운트 시 keydown 이벤트를 등록합니다. 사용자의 입력이 없으면 selectedIndex는 undefined 지만 키보드 이벤트를 받으면 특정 요소의 인덱스 정보를 담게 됩니다. 사용자 편의를 위해 첫 요소에서 위로 올라가면 마지막요소를, 마지막 요소에서 아래로 내려가면 첫 요소로 전환될 수 있도록 추가적으로 처리했습니다.

```typescript
// components/search/SearchBarDropdownRecommend.tsx 17:30
useEvent('keydown', (e: KeyboardEvent) => {
  if (e.isComposing) return;
  if (e.key === 'ArrowDown') {
    const current = selectedIndex === undefined ? -1 : selectedIndex;
    changeIndex((current + 1) % recommends.length);
  } else if (e.key === 'ArrowUp') {
    const current = selectedIndex === undefined ? 0 : selectedIndex;
    changeIndex((current + recommends.length - 1) % recommends.length);
  }
});
```

- 이벤트 등록은 useEvent 훅으로 처리했으며 다양한 키와 리스너를 등록할 수 있도록 추상화하였습니다. 특정 이벤트만 정의하면 활용에 한계가 있었습니다. keydown 뿐만 아니라 click 이벤트에도 활용할 수 있도록 제네릭 타입으로 정의했습니다.

```typescript
// hooks/useEvent.ts
const useEvent = <T extends keyof WindowEventMap>(
  key: T,
  listener: (e: WindowEventMap[T]) => void,
) => {
  useEffect(() => {
    window.addEventListener(key, listener);
    return () => {
      window.removeEventListener(key, listener);
    };
  }, [key, listener]);
};
```

- 현재 선택된 요소에 스크롤이 따라오도록 설정한 부분입니다. MutableRefObject를 활용해서 선택된 요소를 담은 ref로 스크롤 되도록 설정했습니다.

```typescript
// components/search/SearchBarDropdownRecommend.tsx
const selectedRef = useRef<HTMLButtonElement | null>();

useEffect(() => {
  selectedRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
}, [selectedIndex]);

return (
    <StyledDiv>
      {recommends.map((recommend, index) => (
        <StyledSearchKeywordItem
          ref={(element) => {
            if (selectedIndex === index) selectedRef.current = element;
          }}
          ...
```

## 기타 편의 기능 2. 검색창 클릭 제어

검색창이 클릭되어 나타난 UI, 드롭다운이 적절한 시점에만 닫히도록 신경썼습니다. 일반적으로 검색창이나 드롭다운을 클릭할 때는 닫히지 않아야 하며 외부를 클릭할 때는 닫혀야 합니다.

- 클릭 이벤트 등록 및 focus 상태에 따라 UI 표시

키보드 제어와 마찬가지로 마우스 제어를 위해 useEvent 훅을 활용했습니다. 현재 클릭된 노드를 파악해서 검색창과 드롭다운 내부에 포함된 노드였는지 파악하는 이벤트입니다. 내부라면 검색창이 focus되었다고 판단하며 외부라면 focus가 해제된 것으로 간주했습니다.

```typescript
// components/search/SearchBar.tsx 17:22

  useEvent('click', (e: MouseEvent) => {
    const clicked = e.target as Node;
    const isClickedInside =
      dropdownRef.current?.contains(clicked) || inputRef.current?.contains(clicked);
    setIsFocused(isClickedInside ?? false);
  });

  return (
    ...
    {isFocused ? <SearchBarDropdown ref={dropdownRef} /> : null}
```

# 추가 정보

### 배포

- 해당 프로젝트는 Vercel를 통해 배포되었습니다. [배포링크](https://cache-storage.vercel.app/)
