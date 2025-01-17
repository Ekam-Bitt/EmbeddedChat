export const searchToMentionUser = (
  message,
  roomMembers,
  startReading,
  setStartReading,
  setFilteredMembers,
  setmentionIndex,
  setshowMembersList
) => {
  const lastChar = message[message.length - 1];
  if (message.length === 0) {
    setshowMembersList(false);
    setStartReading(false);
    setFilteredMembers([]);
    setmentionIndex(-1);
    return;
  }

  if (lastChar === '@') {
    if (message.length > 1 && message[message.length - 2] !== ' ') return;
    setStartReading(true);
    setFilteredMembers(roomMembers);
    setmentionIndex(0);
    setshowMembersList(true);
  } else if (startReading) {
    if (lastChar === ' ') {
      setStartReading(false);
      setFilteredMembers([]);
      setmentionIndex(-1);
      setshowMembersList(false);
    } else {
      const c = message.lastIndexOf('@');

      setFilteredMembers(
        roomMembers.filter(
          (member) =>
            member.name
              .toLowerCase()
              .includes(message.substring(c + 1).toLowerCase()) ||
            member.username
              .toLowerCase()
              .includes(message.substring(c + 1).toLowerCase())
        )
      );

      setshowMembersList(true);
      setmentionIndex(0);
    }
  }
};
