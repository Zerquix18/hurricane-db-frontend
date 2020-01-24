import styled from 'styled-components';

export default {
  Container: styled.div<any>`
    height: ${props => props.height ? props.height : 500}px;
    width: 100%;
    margin-left: 0;
  `,
  Map: styled.div<any>`
    height: ${props => props.height ? `${props.height}px` : '85vh'};
    width: 100%;
    margin: 0 auto;
    display: 'flex', 
    flexFlow: 'row nowrap', 
    justifyContent: 'center', 
    padding: 0
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 5px;
  `,
  MapContainer: styled.div`
    
  `,
};