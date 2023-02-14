import React, { useCallback, useState } from 'react';
import { changeUserRegisterPosition } from '../../store/registerSlice/registerSlice';
import { useAppDispatch } from '../../hooks/redux';

type InputPropsType = {
  positionName: string;
};

export default function PositionChoose({ positionName }: InputPropsType) {
  const dispatch = useAppDispatch();

  const [isChek, setIsChek] = useState<boolean>(false);

  const isChekHROnClick = useCallback(() => {
    setIsChek(!isChek);
    dispatch(changeUserRegisterPosition({ isCheck: isChek, value: positionName }));
  }, [dispatch, isChek, positionName]);

  return (
    <button type="button" onClick={isChekHROnClick}>
      {positionName}
      <input type="checkbox" value={positionName} checked={isChek} readOnly />
    </button>
  );
}
