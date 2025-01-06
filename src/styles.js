export const SCROLLBAR_STR = `
scrollbar-color: #e0e0e0 #f5f5f5;
scrollbar-width: thin;
-webkit-overflow-scrolling: touch;

&::-webkit-scrollbar-track {
  margin-left: 10px;
  border-radius: 3px;
  background-color: #f5f5f5;
}

&::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

&::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #e0e0e0;
}
`;

export const SCROLLBAR_OBJ = {
  scrollbarColor: '#e0e0e0 #f5f5f5',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar-track': {
    marginLeft: '10px',
    borderRadius: '3px',
    backgroundColor: ' #f5f5f5',
  },
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
    backgroundColor: ' #f5f5f5',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '3px',
    backgroundColor: ' #e0e0e0',
  },
};
