import SectionListItem from './SectionListItem';

export default {
  title: 'SectionPage/SectionListItem',
  component: SectionListItem,
};

const Template = () => (
  <SectionListItem
    id={1}
    name='강남역'
    distance={2}
    lineSection={{ id: 1, color: '', name: '', stations: [], sections: [] }}
    deleteSection={() => {}}
  />
);
export const Default = Template.bind({});
