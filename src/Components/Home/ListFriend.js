import React from 'react';

const FriendItem = ({ name, imgSrc }) => (
  <div className="bg-[#212831] SelectedItem flex items-center space-x-4 p-2 rounded-md cursor-pointer">
    <img src={imgSrc} alt={name} className="w-10 h-10 rounded-full" />
    <span className="text-white">{name}</span>
  </div>
);

const ListFriend = () => {
  const friends = [
    { name: 'Friend 1', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 2', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 3', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 4', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 5', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 6', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 7', imgSrc: '/media/picture/images.png' },
    { name: 'Friend 8', imgSrc: '/media/picture/images.png' },
  ];

  return (
    <div className="bg-[#212831] w-64 h-screen p-4 fixed right-0 top-0 mt-16">
      <div className="space-y-2">
        {friends.map((friend, index) => (
          <FriendItem key={index} name={friend.name} imgSrc={friend.imgSrc} />
        ))}
      </div>
    </div>
  );
};

export default ListFriend;
