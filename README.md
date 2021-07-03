## 협업 요구사항

- [ ] step1에서 사용할 API의 배포 일정, 이후 step2에서의 추가 개발을 위한 설계 논의, 그 외 필요한 사항들 있는지 확인
      배포한 API 4개 중 하나를 무작위로 연결하더라도 어플리케이션이 정상 동작해야 합니다. (현재 1개만 가용 가능합니다.)

## 구현 요구사항

요구사항 명세를 먼저 작성합니다.
상태 관리 방법을 스스로 선택합니다. 선택한 상태 관리 방법이 적절하다고 생각한 이유를 명시해주세요.
레벨 1에서 구현했던 기능들을 React로 다시 구현해보는 작업입니다. 레벨 1에서 개발했던 어플리케이션을 다시 확인해보세요.

## 테스트 요구사항

각 기능별로 테스트 코드를 반드시 포함합니다.

## 기능 요구사항

### 메인화면

- [x] 로그인이 되어있다면 메인화면에 "환영합니다" 문구를 노출시킨다.
- [x] 로그인이 안되어있다면 메인화면에 '지하철 노선도 앱을 이용하기 위해서는 로그인을 해주세요' 문구를 노출시킨다.

### 회원가입

- [x] 사용자는 회원 가입을 할 수 있다.
      필요 정보: 이메일, 나이, 비밀번호, 비밀번호 확인 정보
- [x] 사용자는 가입시 이미 가입한 이메일인지 중복 확인을 할 수 있다.

### 로그인

- [x] 사용자는 가입한 계정으로 로그인을 할 수 있다.
  - [x] 로그인에 실패한 경우 실패한 이유를 확인할 수 있어야 한다.
- [x] 사용자는 로그인하여 지하철 노선도 관리 페이지에 접근할 수 있다.

### 역 추가

- [x] 사용자는 지하철 역을 추가할 수 있다.
  - [x] 역 이름은 2자이상 20자 이하이다.
  - [x] 역 이름은 한글, 숫자로만 이루어져 있다.
  - [x] 역 이름은 공백을 포함할 수 없다.

### 역 삭제

- [x] 사용자는 지하철 역을 삭제할 수 있다.
- [x] 노선에 등록되어 있는 역인 경우 삭제할 수 없다.

### 역 조회

- [x] 사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다.

### 노선 추가

- [x] 사용자는 지하철 노선을 추가할 수 있다.
      필요 정보: 노선 이름, 상행역, 하행역, (최초 상행역과 하행역 구간의)거리, 색상
  - [x] 노선 이름은 2자이상 10자 이하이다.
  - [x] 노선 이름은 한글, 숫자로만 이루어져 있다.
  - [x] 노선 이름은 공백을 포함할 수 없다.
  - [x] 상행역, 하행역은 기존에 등록되어 있는 지하철 역 목록 중에서 선택한다.
  - [x] 미리 지정되어 있는 10가지 색상 중 한 색상을 선택한다.
    - [x] 다른 노선에서 사용하는 색은 선택 불가능

### 노선 삭제

- [x] 사용자는 등록되어 있는 지하철 노선을 삭제할 수 있다.

### 노선 조회

- [x] 사용자는 등록되어 있는 전체 지하철 노선 목록을 조회할 수 있다.

### 구간 조회

- [x] 사용자는 특정 노선의 전체 구간 목록을 확인할 수 있다.

### 구간 추가

- [x] 사용자는 특정 지하철 노선에 구간을 추가할 수 있다.
      하나의 노선에서 갈래길은 생길 수 없음
- [x] 하나의 역은 여러 개 노선에 중복되어 포함될 수 있다.
- [x] 역과 역 사이에 새로운 역 추가 가능하다.

### 구간 삭제

- [x] 사용자는 노선에 등록되어 있는 구간을 삭제할 수 있다.

## 선택 요구사항

각 기능마다 수정 기능을 제공합니다.

- [ ] 사용자는 등록되어 있는 지하철 역의 이름을 수정할 수 있다.
- [x] 사용자는 지하철 노선의 정보를 수정할 수 있다.
- [x] 사용자는 노선에 등록되어 있는 구간을 수정할 수 있다.
- [ ] '색상을 직접 입력받아서 더 다양한 색상을 지정할 수 있게' 변경
