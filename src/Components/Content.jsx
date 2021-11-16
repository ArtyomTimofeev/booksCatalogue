import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupOfBooks from './GroupOfBooks';
import RecommendedBookBlock from './RecommendedBookBlock';
import GroupingSelect from './GroupingSelect';
import Preloader from './Preloader';
import _ from 'underscore';

const Content = ({ allBooks }) => {
  const [groupingByTypeBooks, setGroupingByTypeBooks] = useState(allBooks);
  const [groupingType, setGroupingType] = useState('year');

  useEffect(() => {
    let groupCards = (groupingType) => {
      if (groupingType === 'author') {
        allBooks.sort((a, b) => (a[groupingType] > b[groupingType] ? 1 : -1));
      } else {
        allBooks.sort((a, b) => (a[groupingType] < b[groupingType] ? 1 : -1));
      }
      let groupingByTypeBooksArr = [];
      let count = null;

      for (let i = 0; i < allBooks.length; i++) {
        if (count !== allBooks[i][groupingType]) {
          let groupOfBooksArr = _.where(allBooks, {
            [groupingType]: allBooks[i][groupingType],
          });
          groupingByTypeBooksArr.push(groupOfBooksArr);
          count = allBooks[i][groupingType];
        }
      }
      setGroupingByTypeBooks(groupingByTypeBooksArr);
    };
    groupCards(groupingType);
  }, [allBooks, groupingType]);

  return (
    <main style={{ backgroundColor: 'rgb(232 232 232)' }}>
      <Container maxWidth="xl" sx={{ pt: 10, pb: 4 }}>
        <GroupingSelect
          groupingType={groupingType}
          setGroupingType={setGroupingType}
        />
        <RecommendedBookBlock allBooks={allBooks} />
        {groupingByTypeBooks.length === 0 ? (
          <Preloader />
        ) : (
          groupingByTypeBooks.map((groupOfBooks, index) => {
            groupOfBooks.sort((a, b) => (a.name > b.name ? 1 : -1));
            return (
              <GroupOfBooks
                key={index}
                groupingType={groupingType}
                groupOfBooks={groupOfBooks}
              />
            );
          })
        )}
      </Container>
    </main>
  );
};

export default Content;
