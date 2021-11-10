import {
    categories,
    CopperMedal,
    GoldMedal,
    levels,
    SilverMedal,
} from '../assets';

export const getCategory = (category) => {
    if (category === 'other') {
        return '';
    }
    const categoryFound = categories.find(
        (categoryItem) => categoryItem.value === category
    );
    if (categoryFound) {
        return categoryFound.vnm;
    } else {
        return '';
    }
};

export const getImg = (category) => {
    const categoryFound = categories.find(
        (categoryItem) => categoryItem.value === category
    );
    if (categoryFound) {
        return categoryFound.img;
    } else {
        return undefined;
    }
};

export const getLevel = (level) => {
    const found = levels.find((levelItem) => levelItem.value === level);
    if (found) return found.vnm;
};

export const getMedal = (index) => {
    switch (index) {
        case 0:
            return <img src={GoldMedal} alt='medal' />;
        case 1:
            return <img src={SilverMedal} alt='medal' />;
        case 2:
            return <img src={CopperMedal} alt='medal' />;
        default:
            return index + 1;
    }
};
