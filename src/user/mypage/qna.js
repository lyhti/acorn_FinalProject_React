import React from 'react';

import '../mypage/container/qna.css';

function qna() {
  return (
    <div className="qnaMain">
      <div className="qnaTitle">
        <h5 className="any_title">
          <strong className="pri">자주 묻는 질문</strong>
        </h5>
      </div>
      <div className="faq_contents">
        <ul className="accodian_wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <li className="accodian_list">
            <div className="accodian_content" style={{ display: 'block' }}>
              <dl className="faq_detail">
                <dt className="q">주문 후 입금했는데, 아직 입금 대기 중이에요.</dt>
                <dd className="a">
                  입금 확인 오전 11시, 오후 2시. [케이크 주문은 선택하신 날짜 전날까지 입금 확인이 되어야 픽업할 수 있으니 해당 시간 이전에 입금 부탁드려요]
                </dd>
              </dl>
              <dl className="faq_detail">
                <dt className="q">사이트에 없는 특별한 모양을 주문하고 싶어요 어떻게 해야하나요?</dt>
                <dd className="a">
                  대부분의 경우 맞춤케익은 고객님께서 시안을 그려주시거나 말로 설명해 주시는 편입니다.
                  케익팩토리의 각 분야카테고리를 클릭해보시면 다양한 상품을 보실수 있습니다.
                  해당 상품들을 조합하여 이미지 시안을 작업해 주시거나 말로서 게시판으로 설명해 주셔도 견적을 드릴수 있습니다.

                  특별히 잘 그리거나, 신경써서 작업해 주실 필요는 없으며, 정확히 원하시는 내용과 문구가 전달되면 됩니다.
                  그림을 전달하기 어려우신 경우 저희 케익의 모델명을 적고 어떤 부분을 어떻게 데코레이션 원하시는지 알려주셔도 됩니다.
                  게시판 등을 통해 안내받으신 케익금액을 사이트 맞춤결제를 통해 결제진행 해주시면 예약이 접수되고,
                  예약하신 날짜에 찾아가시면 됩니다.
                </dd>
              </dl>
              <dl className="faq_detail">
                <dt className="q">케익은 몇일전까지 예약해야 하나요 ?</dt>
                <dd className="a">
                  보통의 경우 케익은 2일전까지 예약해주시면 대부분 상품을 받아보실수 있습니다.
                  기성상품이 아닌 특별한 맞춤케익을 주문주실경우 최소 3~5일전까지 주문주시는 편이 좋습니다.
                  캐릭터 모델링(인형) 장식이 있거나 케익의 모양이 특별한 경우 5일전까지 예약을 주셔야 합니다.
                  케익의 비용은 예약시 100% 입금을 원칙으로 하며, 케익의 예약일 2일전까지는 입금해 주셔야 합니다.

                  부득이한 사정으로 급하게 예약케익이 필요하신 경우, 콜센터로 문의를 주시는 경우 작업 사정에 따라 안내를 드릴수 있습니다.
                </dd>
              </dl>
              <dl className="faq_detail">
                <dt className="q">주문을 취소하고 싶어요</dt>
                <dd className="a">
                  ‘결제 완료’ 상태일 경우, 언제든지 홈페이지 [MY PAGE] 에서 직접 취소하실 수 있어요.
                  ‘상품 준비‘ 상태가 되면 취소가 어렵습니다.
                  직접 취소가 어려우실 땐 고객센터(1661-1031) 또는 홈페이지 1:1 문의하기를 통해 성함과 연락처를 알려주시면 주문 취소를 도와드릴게요.
                </dd>
              </dl>
              <dl className="faq_detail">
                <dt className="q">이미 수령한 상품에 대한 반품은 어떻게 신청하나요?</dt>
                <dd className="a">
                  케이크 상품 특성 상, 제작이 완료된 이후에는 환불이 불가능해요.
                  하지만 제작 오류 등 저희의 책임이 입증되는 경우에는 고객센터에서 확인 후 처리 도와드릴게요.
                </dd>
              </dl>
              <dl className="faq_detail">
                <dt className="q">ID와 비밀번호를 잊어버렸어요.</dt>
                <dd className="a">
                  로그인 페이지에서 아이디/비밀번호 찾기를 통해 확인하실 수 있어요.
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default qna;