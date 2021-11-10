import { categories } from '../assets';

export const getSubject = (subject) => {
    if (subject === 'other') {
        return '';
    }
    const categoryFound = categories.find(
        (categoryItem) => categoryItem.value === subject
    );
    if (categoryFound) {
        return categoryFound.vnm;
    } else {
        return '';
    }
};

export const getAdmin = (listMembers) => {
    if (listMembers) {
        return listMembers.find((memberItem) => memberItem.role === 'admin');
    }
    return null;
};

export const getMembers = (listMembers) => {
    if (listMembers) {
        return listMembers.filter((memberItem) => memberItem.role !== 'admin');
    }
    return [];
};
