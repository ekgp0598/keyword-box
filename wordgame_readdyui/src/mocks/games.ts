export interface Game {
  id: string;
  name: string;
  description: string;
  tags: string[];
  iconClass: string;
  color: string;
}

export const games: Game[] = [
  {
    id: 'body-talk',
    name: '몸으로 말해요',
    description: '말 없이 몸짓으로 제시어를 설명하고 맞히는 게임',
    tags: ['파티', '팀전', '몸짓'],
    iconClass: 'ri-body-scan-line',
    color: 'party-pink',
  },
  {
    id: 'silent-shout',
    name: '고요 속의 외침',
    description: '제시어 자체를 말하지 않고 설명만 입모양으로 전달하는 게임',
    tags: ['입모양', '설명', '팀전'],
    iconClass: 'ri-user-voice-line',
    color: 'party-sky',
  },
  {
    id: 'telestration',
    name: '텔레스트레이션',
    description: '그림과 추측을 번갈아 이어가는 게임',
    tags: ['그림', '추측', '웃김'],
    iconClass: 'ri-paint-brush-line',
    color: 'party-yellow',
  },
];