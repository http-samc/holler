import md5 from 'md5';

const getAvatar = (email) => {
    //var emailFmt = email.toLowerCase().replaceAll(' ', '');
    var hash = md5(email);
    return `https://avatars.dicebear.com/api/human/${hash}.svg?size=20`;
}

export default getAvatar;