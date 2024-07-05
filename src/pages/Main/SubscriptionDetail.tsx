import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../../components/topbar/TopBar';
import TotalSubscriptionFee from '../../components/totalfee/TotalSubscriptionFee';
import PieChart from '../../components/totalfee/PieChart';
import * as S from './SubscriptionDetail.Style';
import * as T from './Main.Style';

const SubscriptionDetail: React.FC = () => {
  const location = useLocation();
  const { totalAmount } = location.state as { totalAmount: number };

  return (
    <T.MainContainer>
      <S.TitleWrapper>
        <TopBar title="이번 달 총 구독료" />
      </S.TitleWrapper>
      <T.PageContainer>
        <TotalSubscriptionFee totalAmount={totalAmount} />
        <S.PieChartTitle>한 눈에 보기</S.PieChartTitle>
        <S.DetailContainer>
          <PieChart />
        </S.DetailContainer>
      </T.PageContainer>
    </T.MainContainer>
  );
};

export default SubscriptionDetail;
