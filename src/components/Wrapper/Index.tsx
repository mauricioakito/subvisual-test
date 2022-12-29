import React from 'react';

interface WrapperProps {
    classname: string;
    children?: JSX.Element | JSX.Element[],
}

export const Wrapper = ({classname, children}: WrapperProps) => {
    return (
        <div className={classname}>
            {children}
        </div>
    );
};
