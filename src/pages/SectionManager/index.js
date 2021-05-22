import React from 'react';
import {
  PageTemplate,
  Selector,
  ManagementList,
  Button,
} from '../../components';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { ListHeader, Title } from './style';

const SectionList = ({ line }) => (
  <>
    <ListHeader>
      <Title color={line.color}>{line.name}</Title>
      <Button type="button" backgroundColor={COLOR.AMBER} hasShadow>
        ➕
      </Button>
    </ListHeader>
    <ManagementList items={[]}></ManagementList>
  </>
);

const SectionManager = (props) => (
  <PageTemplate title={ROUTE.SECTION_MANAGE.NAME}>
    <Selector
      name="section-select-line"
      label="노선 선택"
      defaultOption="노선 선택"
      options={[]}
      size={SIZE.MD}
    ></Selector>
    {/* {selectedLine && <SectionList line={selectedLine}/>} */}
  </PageTemplate>
);

export default SectionManager;
