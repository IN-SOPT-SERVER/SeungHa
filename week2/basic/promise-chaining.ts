// 콜백함수(매개변수 없음, 리턴값 없음)와 시간을 지정하는 number타입의 매개변수를 받음
const me = (callback: () => void, time: number) => {
    setTimeout(callback, time);
};

const wakeUp = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 일어남");
            resolve("일어남");
        }, 1000);
    })
};

// 이전에 일어났던 상태를 now라는 파라미터로 받음
const goBathRoom = (now: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 화장실로 이동함");
            resolve(`${now} -> 화장실로 이동함`);
        }, 1000);
    });
};

const ready = (now: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        me(() => {
            console.log("[현재] 칫솔과 치약을 준비함");
            resolve(`${now} -> 칫솔과 치약을 준비함`);
        }, 1000);
    });
};

//* 양치함
const startChikaChika = (now: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      me(() => {
        console.log("[현재] 양치함");
        resolve(`${now} -> 양치함`);
      }, 1000);
    });
  };
  
  //* 나 자신에게 칭찬함
  const goodJob = (now: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      me(() => {
        console.log("[현재] 나 자신에게 칭찬중");
        resolve(`${now} -> 칭찬중`);
      }, 1000);
    });
  };
  

wakeUp()
    .then((now) => goBathRoom(now))
    .then((now) => startChikaChika(now))
    .then((now) => goodJob(now))
    .then((now) => console.log(`\n${now}`));
