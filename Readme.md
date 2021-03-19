## CreateDutMap 사용방법

CreateDutMap은 PS1120/60/30 Device의 각 Switch와 DUT의 Signal을 자동으로 연결해 주는 프로그램이다.

[TOC]

ProbeCard를 제작한다는 것은 연결 관점에서만 본다면 ATE Measeure Line과 DUT의 Signal을 Switch를 통해서 연결(connect) 또는 해제(disconnect)할 수 있도록 회로를 구성하는 것이며, Switch이 On/Off 제어에 의해서 회로 구성을 변경할 수 있다.

Switch의 효율적인 제어(On/Off)를 위해서는 Switch의 구성이 절대적이다.

PS1120/60/30 Device에는 각각 120/60/30개의 Switch가 존재하고, 각각은 명령을 통해서 제어(On/Off)된다.

PS1120/60/30 Device는 동일한 SPI Interface에 최대 8개의 Device가 연결될 수 있으며, 각각의 Device는 Dynamic하게 Address가 할당된다. 이와 같이 동일한 SPI Interface에 연결된 PS1120/60/30 Device들을 `Bank`라는 개념으로 묶어서 표현한다.

즉, 동일한 SPI Interface에 PS1120 Device를 8개를 연결하였다면, `Bank`에는 960(120 x 8)개의 Switch가 존재한다.

`Bank` 네에서 DUT의 Signal에 연결된 Switch의 구성에 따라서 효율적인 제어(On/Off)와 Switch 할당이 가능하다.

또한 `Probe Card`에는 여러 개의 `Bank`가 구성되기 때문에 각 `Bank`의 구성을 동일하게 유지함으로써 Switch 제어(FPGA 코딩)가 가능해 진다.

결론적으로 `CreateDutMap` 프로그램은 전체 `Probe Card`에서 각각의 `Bank`구성 및 `PS1120/60/30`의 배치와 Switch 할당을 자동으로 생성해 주는 프로그램이다.


### CreateDutMap 실행.

[**`GitHub`**](https://github.com/kwangho9/CreateDutMap)에 접속해서 압축된 `CreateDutMap-master.zip` 파일을 다운로드 받는다.

![](/doc/image_017.png)

`CreateDutMap-master.zip` 파일을 압축 해제하고, `CreateDutMap._xe` 파일을 실행한다.

### CreateDutMap 사용하기.


### 결과 확인하기.
