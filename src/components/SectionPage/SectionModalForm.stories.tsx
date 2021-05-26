import SectionModalForm from './SectionModalForm';

export default {
  title: 'SectionPage/SectionModalForm',
  component: SectionModalForm,
};

const Template = () => (
  <SectionModalForm
    onLineChange={() => {}}
    lines={[]}
    stations={[]}
    lineSection={{ id: 1, color: '', name: '', stations: [], sections: [] }}
    onModalClose={() => {}}
  />
);
export const Default = Template.bind({});
