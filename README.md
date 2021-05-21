# react-subway-map

# 🚇 지하철 노선도 - 레벨2 종합세트 & 테스트

# 미션 목표

- 레벨 2에서 학습한 컴포넌트 기반 개발, 상태 관리 방법에 대한 내용을 전반적으로 복습하며 적용하는 연습을 합니다.
  - React에 관한 개념을 전반적으로 복습하며 적용해봅니다.
    이번 미션에서 React와 관련한 추가 개념은 다루지 않습니다.
- 테스트를 고려하며 개발하는 연습을 합니다.
- 백엔드 개발자와 협업하기 위한 커뮤니케이션 경험을 쌓습니다.

# 미션 진행 방식

- 프론트엔드 페어 운영 방식 및 프론트엔드 리뷰 프로세스는 동일합니다.
  - step1은 페어로 진행, step2는 개별로 진행
  - 각 step당 1번씩 리뷰어에게 PR로 리뷰 요청
- 백엔드 개발자와의 협업 경험을 위해 백엔드 크루들이 협업 페어로 매칭됩니다.
  - 프론트엔드 1 페어당 백엔드 2 페어가 매칭됩니다. (프론트 크루 2명 + 백엔드 크루 4명)
  - 매칭된 백엔드 크루들과 배포 일정, API 설계 논의 일정 등을 자율적으로 논의해 진행해주세요.
  - 백엔드 크루들의 API가 배포 완료되기 전까지는 [API명세 문서](https://woowacourse.github.io/atdd-subway-fare/)를 확인하여 개발을 먼저 진행합니다.

---

# 미션 요구사항

각 step의 상세 요구사항은 다음 페이지를 확인해주세요.

## step1) 협업 논의 + 테스트 코드와 함께 지하철 노선도 관리 페이지 기본 구현

```
구현 마감은 5/27(목) 입니다. 원활한 협업이 될 수 있도록 일정을 잘 협의해주세요 :)
```

<br/>

**협업 요구사항**

- 백엔드 페어와 협업을 위해 필요한 사항들을 논의합니다.
  - step1에서 사용할 API의 배포 일정, 이후 step2에서의 추가 개발을 위한 설계 논의, 그 외 필요한 사항들 있는 지 확인
- <span class="highlight-cyan">배포한 API 4개 중 하나를 무작위로 연결</span>하더라도 어플리케이션이 정상 동작해야 합니다. - 무작위 연결을 확인해볼 수 있는 방법은 페어와 자율적으로 결정합니다. (단, 코드를 직접 수정해야 하는 방법은 제외)
  <br/>

**구현 요구사항**

- [요구사항 명세](./REQUIREMENTS.md)를 작성합니다.
- <span class="highlight-cyan">상태 관리 방법을 스스로 선택</span>합니다. 선택한 상태 관리 방법이 적절하다고 생각한 이유를 명시해주세요.
- 레벨 1에서 구현했던 기능들을 React로 다시 구현해보는 작업입니다. 레벨 1에서 개발했던 어플리케이션을 다시 확인해보세요.
  <br/>

**테스트 요구사항**

- 각 기능별로 <span class="highlight-cyan">테스트 코드를 반드시 포함</span>합니다.

---

## step2) 백엔드 개발자와 함께 추가 기능 구현

```
구현 마감은 6/3(목) 입니다. 원활한 협업이 될 수 있도록 일정을 잘 협의해주세요 :)
```

**협업 요구사항**

- 백엔드 개발자와 API 설계 논의부터 함께합니다.
  - <span class="highlight-cyan">배포한 API 4개 중 하나를 무작위로 연결</span>하더라도 어플리케이션이 정상 동작해야 합니다.
  - 무작위 연결을 확인해볼 수 있는 방법은 페어와 자율적으로 결정합니다. (단, 코드를 직접 수정해야 하는 방법은 제외)
- (기본) 전체보기 기능을 추가로 구현합니다.
  - 백엔드 API 신규 개발이 필요합니다. 새로 만들어야 하는 API 명세를 함께 논의하며 개발합니다.
- (선택) 경로 찾기 기능을 추가로 구현합니다.
  - 이미 개발되어 있는 백엔드 API가 있습니다. 기존의 API 명세를 확인하고 수정이 필요한 부분이 있는 지 논의하며 개발합니다.

**구현 요구사항**

- 추가 기능을 위한 UI는 직접 설계하고 만듭니다.
