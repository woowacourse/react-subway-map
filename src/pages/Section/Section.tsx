import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import AddSectionForm from '../../components/SectionPage/AddSectionForm';
import SectionListItem from '../../components/SectionPage/SectionListItem';
import * as S from './Section.styles';

const Section = () => {
  return (
    <S.Container>
      <ContentContainer hatColor='MINT_500'>
        <AddSectionForm />
      </ContentContainer>
      <ContentContainer>
        <S.SectionStationList>
          <SectionListItem name='아현역' distance={10} lineColor='#be3935' />
          <SectionListItem name='아현역' distance={10} lineColor='#be3935' />
          <SectionListItem name='아현역' distance={10} lineColor='#be3935' />
          <SectionListItem name='아현역' distance={10} lineColor='#be3935' />
          <SectionListItem name='아현역' distance={10} lineColor='#be3935' />
          <SectionListItem name='아현역' lineColor='#be3935' />
        </S.SectionStationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Section;
