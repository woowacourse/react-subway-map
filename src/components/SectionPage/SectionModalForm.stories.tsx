import SectionModalForm from './SectionModalForm';

export default {
  title: 'SectionPage/SectionModalForm',
  component: SectionModalForm,
};

const Template = () => (
  <SectionModalForm
    onSelectLine={() => {}}
    lines={[]}
    stations={[]}
    lineSection={{ id: 1, color: '', name: '', stations: [], sections: [] }}
    onCloseModal={() => {}}
    addSection={() => {}}
  />
);
export const Default = Template.bind({});
