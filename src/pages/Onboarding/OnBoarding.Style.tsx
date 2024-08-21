import styled from 'styled-components';

// 컨테이너
export const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 375px;
  height: 100vh;
  margin: 0 auto;
  background-color: #222;
  color: #fff;
  box-sizing: border-box;
`;

// 컨텐츠 컨테이너
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-bottom: 40px;
`;

// 로고 이미지
export const Logo = styled.img`
  width: 60px;
  margin-top: 130px;
  margin-bottom: 14px;
`;

// 타이틀
export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 1px;
`;

// 카카오 로그인 컨테이너
export const KakaoLoginCont = styled.div`
  margin-top: 200px;
`;
