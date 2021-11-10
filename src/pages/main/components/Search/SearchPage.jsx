import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { search } from '../../../../apis';
import { SUCCESS } from '../../../../constant';
import EmptyText from '../../commonComponents/EmptyText';
import PracticeList from '../../commonComponents/PracticeList';
import SearchBox from './components/SearchBox';
import UserList from './components/UserList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchPage = () => {
    let queryString = useQuery();
    const query = queryString.get('q');
    const classes = useStyles();
    const [usersResult, setUsersResult] = useState([]);
    const [practicesResult, setPracticesResult] = useState([]);
    const handleSearch = async () => {
        const response = await search(query);
        if (response.data.status === SUCCESS) {
            const { users, practices } = response.data.data;
            setUsersResult((prev) => [...prev, ...users]);
            setPracticesResult((prev) => [...prev, ...practices]);
        }
    };

    useEffect(() => {
        setUsersResult([]);
        setPracticesResult([]);
        if (query) {
            handleSearch();
        }
        return () => {
            setUsersResult([]);
            setPracticesResult([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);

    return (
        <div className={classes.root}>
            <SearchBox />
            {usersResult.length > 0 && <UserList userList={usersResult} />}
            {practicesResult.length > 0 && (
                <PracticeList
                    practiceList={practicesResult}
                    title={'Bài tập'}
                />
            )}
            {usersResult.length === 0 && practicesResult.length === 0 && (
                <EmptyText text='Không tìm thấy kết quả phù hợp' />
            )}
        </div>
    );
};

export default SearchPage;
