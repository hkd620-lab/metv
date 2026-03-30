import { TravelSection } from './types';

// 기존 10개의 코어 단어를 섹션 1로, 신규 20개를 섹션 2, 3으로 묶어 내보냅니다.
export const travelSections: TravelSection[] = [
  {
    id: "section-1",
    title: "섹션 1: 생존 기초 (Core Survival)",
    description: "가장 기본이 되는 필수 영단어 10개입니다. 공항과 길거리에서 생존하세요!",
    words: [
      { id: '1', english: 'Passport', korean: '여권', category: 'airport', examples: [
        { english: 'Can I see your passport?', korean: '여권을 보여주시겠어요?' },
        { english: 'I lost my passport.', korean: '여권을 잃어버렸어요.' },
        { english: 'Here is my passport.', korean: '제 여권은 여기 있습니다.' },
        { english: 'My passport is expired.', korean: '여권이 만료되었습니다.' },
        { english: 'Please keep your passport safe.', korean: '여권을 안전하게 보관하세요.' },
      ]},
      { id: '2', english: 'Ticket', korean: '표 / 티켓', category: 'airport', examples: [
        { english: 'I need a ticket to London.', korean: '런던행 티켓이 필요합니다.' },
        { english: 'Where is my ticket?', korean: '제 티켓은 어디에 있나요?' },
        { english: 'Can I buy a ticket here?', korean: '여기서 티켓을 살 수 있나요?' },
        { english: 'This is my flight ticket.', korean: '이것은 제 비행기 티켓입니다.' },
        { english: 'Please show your ticket.', korean: '티켓을 보여주세요.' },
      ]},
      { id: '3', english: 'Luggage', korean: '수하물 / 짐', category: 'airport', examples: [
        { english: 'Where is my luggage?', korean: '제 짐은 어디에 있나요?' },
        { english: 'I have two pieces of luggage.', korean: '수하물이 두 개 있습니다.' },
        { english: 'My luggage is missing.', korean: '제 수하물이 없어졌어요.' },
        { english: 'Can you help me with my luggage?', korean: '제 짐을 좀 도와주시겠어요?' },
        { english: 'Please put your luggage here.', korean: '수하물을 여기에 놓아주세요.' },
      ]},
      { id: '4', english: 'Reservation', korean: '예약', category: 'accommodation', examples: [
        { english: 'I have a reservation.', korean: '예약을 했습니다.' },
        { english: 'I would like to make a reservation.', korean: '예약을 하고 싶습니다.' },
        { english: 'Cancel my reservation, please.', korean: '제 예약을 취소해 주세요.' },
        { english: 'Under what name is the reservation?', korean: '어느 이름으로 예약되어 있나요?' },
        { english: 'I made a hotel reservation.', korean: '호텔 예약을 했습니다.' },
      ]},
      { id: '5', english: 'Station', korean: '역 / 정거장', category: 'transport', examples: [
        { english: 'Where is the subway station?', korean: '지하철역은 어디에 있나요?' },
        { english: 'I am at the train station.', korean: '기차역에 있습니다.' },
        { english: 'Which station is this?', korean: '여기는 어느 역인가요?' },
        { english: 'We need to get off at the next station.', korean: '다음 역에서 내려야 합니다.' },
        { english: 'Is the bus station far from here?', korean: '버스터미널은 여기서 먼가요?' },
      ]},
      { id: '6', english: 'Hotel', korean: '호텔', category: 'accommodation', examples: [
        { english: 'Where is the hotel?', korean: '호텔은 어디에 있나요?' },
        { english: 'I am staying at this hotel.', korean: '저는 이 호텔에 머물고 있습니다.' },
        { english: 'Is the hotel expensive?', korean: '그 호텔은 비싼가요?' },
        { english: 'We need to find a hotel tonight.', korean: '오늘 밤에 호텔을 찾아야 해요.' },
        { english: 'Call a taxi to the hotel.', korean: '호텔로 택시를 불러주세요.' },
      ]},
      { id: '7', english: 'Menu', korean: '메뉴판', category: 'restaurant', examples: [
        { english: 'Can I see the menu?', korean: '메뉴판을 볼 수 있을까요?' },
        { english: 'Please bring the menu.', korean: '메뉴판을 가져다주세요.' },
        { english: 'What is on the menu?', korean: '메뉴에 무엇이 있나요?' },
        { english: 'I will order from the menu.', korean: '메뉴를 보고 주문하겠습니다.' },
        { english: 'Do you have an English menu?', korean: '영어 메뉴판이 있나요?' },
      ]},
      { id: '8', english: 'Water', korean: '물', category: 'restaurant', examples: [
        { english: 'Can I have some water?', korean: '물 좀 주시겠어요?' },
        { english: 'I need a bottle of water.', korean: '물 한 병이 필요해요.' },
        { english: 'Is this water safe to drink?', korean: '이 물 마셔도 안전한가요?' },
        { english: 'Hot water, please.', korean: '뜨거운 물 부탁드립니다.' },
        { english: 'Where can I buy water?', korean: '물을 어디서 살 수 있나요?' },
      ]},
      { id: '9', english: 'Bathroom', korean: '화장실', category: 'facilities', examples: [
        { english: 'Where is the bathroom?', korean: '화장실은 어디에 있나요?' },
        { english: 'I need to use the bathroom.', korean: '화장실을 써야 해요.' },
        { english: 'Is there a public bathroom near here?', korean: '이 근처에 공중화장실이 있나요?' },
        { english: 'The bathroom is very clean.', korean: '화장실이 매우 깨끗합니다.' },
        { english: 'Can I use your bathroom?', korean: '화장실을 사용해도 될까요?' },
      ]},
      { id: '10', english: 'Help', korean: '도움 / 돕다', category: 'emergency', examples: [
        { english: 'Can you help me?', korean: '저를 도와주실 수 있나요?' },
        { english: 'I need help.', korean: '도움이 필요해요.' },
        { english: 'Please help.', korean: '제발 도와주세요.' },
        { english: 'Thank you for your help.', korean: '도와주셔서 감사합니다.' },
        { english: 'I will ask for help.', korean: '도움을 요청하겠습니다.' },
      ]}
    ]
  },
  {
    id: "section-2",
    title: "섹션 2: 호텔 및 숙박 (Accommodation)",
    description: "호텔 체크인부터 편의 시설 이용까지 필수 단어들을 익혀보세요.",
    words: [
      { id: '11', english: 'Check-in', korean: '체크인/수속', category: 'accommodation', examples: [
        { english: 'I want to check in.', korean: '체크인 하고 싶습니다.' },
        { english: 'What time is check in?', korean: '체크인 시간은 언제입니까?' },
        { english: 'Where is the check in counter?', korean: '체크인 카운터는 어디인가요?' },
        { english: 'I am here for check in.', korean: '체크인 하러 왔습니다.' },
        { english: 'Is early check in possible?', korean: '얼리 체크인이 가능한가요?' },
      ]},
      { id: '12', english: 'Room', korean: '객실/방', category: 'accommodation', examples: [
        { english: 'Where is my room?', korean: '제 방은 어디인가요?' },
        { english: 'I need a clean room.', korean: '깨끗한 방이 필요합니다.' },
        { english: 'This room is too small.', korean: '이 방은 너무 작아요.' },
        { english: 'Can I change my room?', korean: '방을 바꿀 수 있나요?' },
        { english: 'The room is very nice.', korean: '방이 정말 좋네요.' },
      ]},
      { id: '13', english: 'Towel', korean: '수건', category: 'accommodation', examples: [
        { english: 'I need a towel.', korean: '수건이 필요해요.' },
        { english: 'Can I have another towel?', korean: '수건 하나 더 주실 수 있나요?' },
        { english: 'The towel is dirty.', korean: '수건이 더러워요.' },
        { english: 'Where are the towels?', korean: '수건은 어디에 있나요?' },
        { english: 'Please bring more towels.', korean: '수건 좀 더 가져다주세요.' },
      ]},
      { id: '14', english: 'Key', korean: '열쇠/키', category: 'accommodation', examples: [
        { english: 'I lost my key.', korean: '열쇠를 잃어버렸어요.' },
        { english: 'This is my room key.', korean: '제 방 열쇠입니다.' },
        { english: 'The key does not work.', korean: '열쇠가 작동하지 않아요.' },
        { english: 'Please leave the key.', korean: '열쇠를 놓고 가세요.' },
        { english: 'Can I have one more key?', korean: '열쇠를 하나 더 받을 수 있나요?' },
      ]},
      { id: '15', english: 'Breakfast', korean: '조식/아침식사', category: 'accommodation', examples: [
        { english: 'Is breakfast included?', korean: '조식이 포함되어 있나요?' },
        { english: 'What time is breakfast?', korean: '조식은 몇 시인가요?' },
        { english: 'Where is the breakfast room?', korean: '조식 식당은 어디에 있나요?' },
        { english: 'I want to eat breakfast.', korean: '아침을 먹고 싶어요.' },
        { english: 'The breakfast is very good.', korean: '아침 식사가 매우 훌륭해요.' },
      ]},
      { id: '16', english: 'Blanket', korean: '담요/이불', category: 'accommodation', examples: [
        { english: 'Can I get a blanket?', korean: '담요 좀 주시겠어요?' },
        { english: 'It is cold I need a blanket.', korean: '추워요 담요가 필요합니다.' },
        { english: 'Please bring an extra blanket.', korean: '담요 하나 더 가져다주세요.' },
        { english: 'This blanket is soft.', korean: '이 이불은 부드럽네요.' },
        { english: 'I left my blanket.', korean: '제 담요를 두고 왔어요.' },
      ]},
      { id: '17', english: 'Elevator', korean: '엘리베이터', category: 'accommodation', examples: [
        { english: 'Where is the elevator?', korean: '엘리베이터는 어디에 있나요?' },
        { english: 'Take the elevator to the fifth floor.', korean: '엘리베이터를 타고 5층으로 가세요.' },
        { english: 'The elevator is broken.', korean: '엘리베이터가 고장났어요.' },
        { english: 'We waited for the elevator.', korean: '우리는 엘리베이터를 기다렸어요.' },
        { english: 'Is there an elevator here?', korean: '여기에 엘리베이터가 있나요?' },
      ]},
      { id: '18', english: 'Air conditioner', korean: '에어컨', category: 'accommodation', examples: [
        { english: 'Turn on the air conditioner.', korean: '에어컨을 켜주세요.' },
        { english: 'The air conditioner is too cold.', korean: '에어컨이 너무 추워요.' },
        { english: 'How do I use this air conditioner?', korean: '이 에어컨은 어떻게 사용하나요?' },
        { english: 'The air conditioner is loud.', korean: '에어컨 소리가 시끄러워요.' },
        { english: 'Please fix the air conditioner.', korean: '에어컨 좀 고쳐주세요.' },
      ]},
      { id: '19', english: 'Pool', korean: '수영장', category: 'accommodation', examples: [
        { english: 'Is there a swimming pool?', korean: '수영장이 있나요?' },
        { english: 'Where is the pool?', korean: '수영장은 어디에 있나요?' },
        { english: 'The pool is closed now.', korean: '수영장은 지금 닫혔습니다.' },
        { english: 'We swam in the pool.', korean: '우리는 수영장에서 수영을 했어요.' },
        { english: 'The pool water is cold.', korean: '수영장 물이 찹니다.' },
      ]},
      { id: '20', english: 'Map', korean: '지도', category: 'transport', examples: [
        { english: 'Do you have a map?', korean: '지도가 있나요?' },
        { english: 'I lost my map.', korean: '지도를 잃어버렸어요.' },
        { english: 'Show me on the map.', korean: '지도에 보여주세요.' },
        { english: 'Where are we on this map?', korean: '우리는 이 지도의 어디에 있나요?' },
        { english: 'This map is useful.', korean: '이 지도는 유용해요.' },
      ]}
    ]
  },
  {
    id: "section-3",
    title: "섹션 3: 식당 및 주문 (Dining & Order)",
    description: "해외 식당에서 자신있게 음식을 주문하고 계산해 보세요.",
    words: [
      { id: '21', english: 'Table', korean: '테이블/자리', category: 'restaurant', examples: [
        { english: 'Table for two please.', korean: '두 명 자리 부탁합니다.' },
        { english: 'I want a window table.', korean: '창가 자리를 원합니다.' },
        { english: 'Is this table free?', korean: '이 자리 비어 있나요?' },
        { english: 'Please clean the table.', korean: '테이블 좀 치워주세요.' },
        { english: 'We waited for a table.', korean: '우리는 자리를 기다렸어요.' },
      ]},
      { id: '22', english: 'Waiter', korean: '종업원/웨이터', category: 'restaurant', examples: [
        { english: 'Excuse me waiter.', korean: '저기요 종업원님.' },
        { english: 'The waiter is very kind.', korean: '그 종업원은 매우 친절해요.' },
        { english: 'Please call the waiter.', korean: '종업원 좀 불러주세요.' },
        { english: 'The waiter took our order.', korean: '종업원이 우리의 주문을 받았어요.' },
        { english: 'Where is our waiter?', korean: '우리 테이블 종업원은 어디 있나요?' },
      ]},
      { id: '23', english: 'Fork', korean: '포크', category: 'restaurant', examples: [
        { english: 'Can I have a fork?', korean: '포크 좀 주시겠어요?' },
        { english: 'I dropped my fork.', korean: '포크를 떨어뜨렸어요.' },
        { english: 'This fork is dirty.', korean: '이 포크는 더러워요.' },
        { english: 'Please bring another fork.', korean: '다른 포크를 가져다주세요.' },
        { english: 'I need a fork and knife.', korean: '포크와 나이프가 필요해요.' },
      ]},
      { id: '24', english: 'Spicy', korean: '매운', category: 'restaurant', examples: [
        { english: 'Is this food spicy?', korean: '이 음식 매운가요?' },
        { english: 'Please make it less spicy.', korean: '덜 맵게 해 주세요.' },
        { english: 'I cannot eat spicy food.', korean: '저는 매운 음식을 못 먹어요.' },
        { english: 'It is too spicy for me.', korean: '저에게는 너무 맵네요.' },
        { english: 'I like spicy dishes.', korean: '저는 매운 요리를 좋아해요.' },
      ]},
      { id: '25', english: 'Delicious', korean: '맛있는', category: 'restaurant', examples: [
        { english: 'This food is delicious.', korean: '이 음식 정말 맛있어요.' },
        { english: 'It was a delicious meal.', korean: '맛있는 식사였습니다.' },
        { english: 'Everything is delicious here.', korean: '여기는 모든 것이 맛있네요.' },
        { english: 'The dessert is delicious.', korean: '디저트가 맛있어요.' },
        { english: 'Thank you it was delicious.', korean: '고맙습니다 정말 맛있었어요.' },
      ]},
      { id: '26', english: 'Bill', korean: '계산서/청구서', category: 'restaurant', examples: [
        { english: 'Can I have the bill please.', korean: '계산서 좀 주시겠어요.' },
        { english: 'Where is the bill?', korean: '계산서는 어디에 있나요?' },
        { english: 'The bill is wrong.', korean: '계산서가 잘못되었어요.' },
        { english: 'Please bring the bill.', korean: '계산서 좀 가져다주세요.' },
        { english: 'I will pay the bill.', korean: '제가 계산하겠습니다.' },
      ]},
      { id: '27', english: 'Dessert', korean: '디저트/후식', category: 'restaurant', examples: [
        { english: 'Do you have dessert?', korean: '디저트가 있나요?' },
        { english: 'I want a sweet dessert.', korean: '달콤한 디저트를 원해요.' },
        { english: 'The dessert menu please.', korean: '디저트 메뉴판 좀 주세요.' },
        { english: 'Let us eat dessert.', korean: '우리 디저트를 먹어요.' },
        { english: 'This dessert is famous.', korean: '이 디저트는 유명해요.' },
      ]},
      { id: '28', english: 'Allergy', korean: '알레르기/알러지', category: 'emergency', examples: [
        { english: 'I have a peanut allergy.', korean: '저는 땅콩 알레르기가 있습니다.' },
        { english: 'Is there an allergy risk?', korean: '알레르기 위험이 있나요?' },
        { english: 'Please check for food allergy.', korean: '식품 알레르기를 확인해주세요.' },
        { english: 'I have an allergy to milk.', korean: '우유 알레르기가 있어요.' },
        { english: 'This is bad for my allergy.', korean: '이건 제 알레르기에 나빠요.' },
      ]},
      { id: '29', english: 'To go', korean: '포장/테이크아웃', category: 'restaurant', examples: [
        { english: 'I want this to go.', korean: '이것을 포장하고 싶습니다.' },
        { english: 'Coffee to go please.', korean: '커피 포장 부탁합니다.' },
        { english: 'Is it for here or to go?', korean: '드시고 가시나요 포장하시나요?' },
        { english: 'Can I get a box to go?', korean: '포장할 상자 좀 받을 수 있나요?' },
        { english: 'We ordered the food to go.', korean: '우리는 음식을 포장 주문했어요.' },
      ]},
      { id: '30', english: 'Cash', korean: '현금', category: 'payment', examples: [
        { english: 'Do you accept cash?', korean: '현금 받으시나요?' },
        { english: 'I will pay in cash.', korean: '현금으로 결제할게요.' },
        { english: 'Where is a cash machine?', korean: '현금 인출기는 어디 있나요?' },
        { english: 'I have no cash.', korean: '비상금이 없어요.' },
        { english: 'Cash only?', korean: '현금만 되나요?' },
      ]}
    ]
  }
];
