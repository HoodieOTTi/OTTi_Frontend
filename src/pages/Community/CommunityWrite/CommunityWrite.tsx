import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../../../libs/AxiosInstance';
import NewTopBar from '../../../components/TopBar/NewTopBar';
import PotSelect from '../../../components/Community/PotSelect/PotSelect';
import WritePost, {
  WritePostHandle,
} from '../../../components/Community/WritePost/WritePost';
import * as S from './CommunityWrite.Style';
import RegisterBtn from '../../../components/TopBar/RegisterBtn/RegisterBtn';

interface PotMembership {
  id: number;
  potName: string;
}

const CommunityWrite: React.FC = () => {
  const [selectedPot, setSelectedPot] = useState<string>('');
  const [ottOptions, setOttOptions] = useState<PotMembership[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const writePostRef = useRef<WritePostHandle>(null);

  // OTT 옵션 로딩
  useEffect(() => {
    const fetchOttOptions = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/pot/application/user/pots/permission',
        );

        if (Array.isArray(response.data)) {
          const options = response.data.map((pot: PotMembership) => ({
            id: pot.id,
            potName: pot.potName,
          }));
          setOttOptions(options);
        } else {
          setOttOptions([]);
        }
      } catch (error) {
        setError('OTT options 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchOttOptions();
  }, []);

  // Post 데이터를 가져오는 함수
  const getPostData = () => {
    if (!writePostRef.current) return null;

    const { title, content, images } = writePostRef.current;
    console.log('getPostData - images:', images);

    const selectedPotObj = ottOptions.find(
      (pot) => pot.potName === selectedPot,
    );
    const potId = selectedPotObj ? selectedPotObj.id : null;

    if (!title || potId === null) {
      alert('제목과 POT을 선택해 주세요.');
      return null;
    }

    const postData = {
      title,
      content: content || '',
      images: images || [],
      potId,
    };

    console.log('postData:', postData); // 최종 postData 확인

    return postData;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <S.CommunityWrite>
      <S.TopBar>
        <NewTopBar title="글쓰기" />
        <RegisterBtn getPostData={getPostData} />
      </S.TopBar>
      <S.Container>
        <PotSelect
          options={ottOptions}
          selected={selectedPot}
          onSelect={setSelectedPot}
        />
        <WritePost ref={writePostRef} />
      </S.Container>
    </S.CommunityWrite>
  );
};

export default CommunityWrite;
