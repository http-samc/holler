import md5 from 'md5';

const getAvatar = (email) => {
    emailFmt = email.toLowerCase().replaceAll(' ', '');
    hash = md5(emailFmt);
    return `https://avatars.dicebear.com/api/human/${hash}.svg?size=20`;
}

export default getAvatar;