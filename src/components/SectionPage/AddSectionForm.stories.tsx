import AddSectionForm from './AddSectionForm';

export default {
  title: 'SectionPage/AddSectionForm',
  component: AddSectionForm,
};

const Template = () => (
  <AddSectionForm
    lineSection={{ id: 1, color: '', name: '', stations: [], sections: [] }}
    lines={[]}
    stations={[]}
    getLineSection={() => {}}
    addSection={() => {}}
  />
);
export const Default = Template.bind({});
