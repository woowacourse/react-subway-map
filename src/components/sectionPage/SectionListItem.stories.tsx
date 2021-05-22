import SectionListItem from './SectionListItem';

export default {
  title: 'SectionPage/SectionListItem',
  component: SectionListItem,
};

const Template = () => <SectionListItem name='강남역' distance={2} />;
export const Default = Template.bind({});
