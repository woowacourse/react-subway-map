import AddStationForm from './AddStationForm';

export default {
  title: 'StationPage/AddStationForm',
  component: AddStationForm,
};

const Template = () => <AddStationForm stations={[]} addStation={() => {}} />;
export const Default = Template.bind({});
