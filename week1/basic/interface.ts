interface SOPT {
    name: string;
    age: number;
    isSOPT?: boolean; // 선택적 프로퍼티
}

const info: SOPT = {
    name: "성이름",
    age: 20,
};

const infos: SOPT[] = [
    {
        name: "이름",
        age: 20,
        isSOPT: true
    }, 
    {
        name: "dd",
        age: 30,
        isSOPT: false
    }
]
