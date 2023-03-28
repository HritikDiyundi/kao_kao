import React, { useState } from 'react'
import EmptyList from '../helper/EmptyList';

const BookmarkIndex = () => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
  if (isEmpty) {
    return <EmptyList/>
  } else {
    return (
        <div></div>
    )
  }
}

export default BookmarkIndex