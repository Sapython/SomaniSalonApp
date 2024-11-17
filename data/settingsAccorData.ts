interface AccordionData {
  id: number;
  query: string;
  data: {
    id: number;
    query: string;
  };
}

const DataQuery: AccordionData[] = [
  {
    id: 1,
    query:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    data: {
      id: 11,
      query:
        " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    },
  },
  {
    id: 2,
    query:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    data: {
      id: 21,
      query:
        " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    },
  },
  {
    id: 3,
    query:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    data: {
      id: 31,
      query:
        " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    },
  },
  {
    id: 4,
    query:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    data: {
      id: 41,
      query:
        " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    },
  },
];

export { AccordionData, DataQuery };
