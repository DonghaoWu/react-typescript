import { ChildAsFC } from './Child';

const Parent = () => {
    return (
        <ChildAsFC color='red' handleClick={() => console.log('Clicked')}>
            hello
        </ChildAsFC>
    )
};

export default Parent;