# serverless 파일 공유 웹 어플리케이션
파일을 업로드하고 URL을 생성하여 누구나 다운로드 할수있는 파일 공유 사이트입니다.  
최대 2GB 까지 업로드할수있고 3일동안 다운로드 가능합니다.
### Front-End
* VanillaJS
### Back-End
* ExpressJS  
* JWT  
* Serverless  
### 프로젝트 구조
![Web App Reference Architecture](https://user-images.githubusercontent.com/51106108/108653268-5ec42380-7509-11eb-9cdb-7a20c52e2b3f.png)
### 업로드
![uploadProcess](https://user-images.githubusercontent.com/51106108/108673634-5aa6fe80-7527-11eb-852c-a6c4a31aa5d3.png)  
1. 파일 업로드 요청
2. 파일이 업로드되기전 DB에 파일의 원본이름과 업로드 날짜등의 정보를 담은 도큐먼트 생성
3. S3에 업로드가 가능한 URL을 생성하여 클라이언트에 응답
4. 클라이언트에서 S3로 파일 업로드
5. S3에 업로드가 완료되면 이벤트 트리거 동작, DB에 미리 생성되었던 도큐먼트 내용갱신(파일 사이즈,유효성 등)
### 다운로드
![downloadProgress](https://user-images.githubusercontent.com/51106108/108674852-45cb6a80-7529-11eb-84cd-8d237c7f343f.png)
