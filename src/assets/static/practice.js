import {
    ChemistryImg,
    EnglishImg,
    GeographyImg,
    InformaticsImg,
    MathImg,
    OtherImg,
    PhysicalImg,
} from '../practiceImgs';

export const levels = [
    {
        value: 'easy',
        vnm: 'Dễ',
    },
    {
        value: 'medium',
        vnm: 'Bình thường',
    },
    {
        value: 'hard',
        vnm: 'Khó',
    },
];

export const categories = [
    {
        value: 'mathematics',
        vnm: 'Toán học',
        img: MathImg,
    },
    {
        value: 'physical',
        vnm: 'Vật lý',
        img: PhysicalImg,
    },
    {
        value: 'english',
        vnm: 'Tiếng Anh',
        img: EnglishImg,
    },
    {
        value: 'chemistry',
        vnm: 'Hóa học',
        img: ChemistryImg,
    },
    {
        value: 'geography',
        vnm: 'Địa lý',
        img: GeographyImg,
    },
    {
        value: 'informatics',
        vnm: 'Tin học',
        img: InformaticsImg,
    },
    {
        value: 'other',
        vnm: 'Khác',
        img: OtherImg,
    },
];

export const sharings = [
    {
        value: 'PUBLIC',
        vmn: 'Công khai',
    },
    {
        value: 'PRIVATE',
        vmn: 'Chỉ mình tôi',
    },
    {
        value: 'CLASS',
        vmn: 'Lớp học',
    },
];

export const types = [
    {
        value: 'constructed-response',
        vnm: 'Tự luận',
    },
    {
        value: 'selected-response',
        vnm: 'Trắc nghiệm',
    },
];
