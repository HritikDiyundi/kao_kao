import React from 'react';
import Search from '../helper/Search';
import WhatsHapp from '../helper/WhatsHapp';
import WhoToFollow from '../helper/WhoToFollow';
import { useSession } from 'next-auth/react';

const IndexPageFeed = () => {
  const { status } = useSession();
  return (
    <div className="horizontal__center__alignment">
      <Search />
      <WhatsHapp />
      {status === 'authenticated' ? <WhoToFollow /> : <div></div>}
      <div className="terminology">
        <p>Terms of service</p>
        <p>Privacy policy</p>
        <p>Cookie policy</p>
        <p>Accessibility</p>
        <p>Ads info</p>
        <p>More...</p>
        <p>2022 CowCow, Inc</p>
      </div>
    </div>
  );
};

export default IndexPageFeed;
