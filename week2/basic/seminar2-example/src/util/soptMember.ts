const soptMembers: SoptMember[] = [
    {
        name: "한유진",
        age: 24,
        where: "제마음속",
        like: "나",
        mbti: "CUTE",
        study: "스터디",
        sibling: false,
        appjam: false,
    },
    {
        name: "이종현",
        age: 26,
        where: "노원",
        like: "헬스",
        mbti: "ENFJ",
        study: "알고리즘",
        sibling: true,
        appjam: false
    },
    {
        name: "양지영",
        age: 25,
        where: "청량리",
        like: "아이스아메리카노",
        mbti: "INFJ",
        study: "사격",
        sibling: true,
        appjam: true,
    }
];

interface SoptMember {
    name: string,
    age: number,
    where: string,
    like: string,
    mbti: string,
    study: string,
    sibling: boolean,
    appjam: boolean
};

export {
    soptMembers,
    SoptMember
}