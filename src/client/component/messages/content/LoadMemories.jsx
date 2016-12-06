import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import { NUMBER_OF_MEMORIES } from '~/types';

const MEMORIES_NAMES = [
  `/data/memories/20000106-1546.mem`,
  `/data/memories/20000508-1900.mem`,
  `/data/memories/20000529-0959.mem`,
  `/data/memories/20000608-1611.mem`,
  `/data/memories/20000711-1214.mem`,
  `/data/memories/20000819-1701.mem`,
  `/data/memories/20001018-1644.mem`,
  `/data/memories/20001028-0700.mem`,
  `/data/memories/20010101-2310.mem`,
  `/data/memories/20010105-2307.mem`,
  `/data/memories/20010305-0120.mem`,
  `/data/memories/20010407-1653.mem`,
  `/data/memories/20010507-1352.mem`,
  `/data/memories/20010617-1342.mem`,
  `/data/memories/20010716-0136.mem`,
  `/data/memories/20010731-1803.mem`,
  `/data/memories/20020327-1106.mem`,
  `/data/memories/20020428-0355.mem`,
  `/data/memories/20020727-0928.mem`,
  `/data/memories/20020818-1553.mem`,
  `/data/memories/20020928-0421.mem`,
  `/data/memories/20021112-2150.mem`,
  `/data/memories/20030215-1742.mem`,
  `/data/memories/20030226-2131.mem`,
  `/data/memories/20030828-2355.mem`,
  `/data/memories/20031003-0913.mem`,
  `/data/memories/20031206-1444.mem`,
  `/data/memories/20040319-0936.mem`,
  `/data/memories/20040407-0146.mem`,
  `/data/memories/20040504-0416.mem`,
  `/data/memories/20040624-2245.mem`,
  `/data/memories/20040701-0009.mem`,
  `/data/memories/20040710-1202.mem`,
  `/data/memories/20040827-1956.mem`,
  `/data/memories/20040926-1027.mem`,
  `/data/memories/20041015-2229.mem`,
  `/data/memories/20041221-0349.mem`,
  `/data/memories/20050122-2153.mem`,
  `/data/memories/20050721-1813.mem`,
  `/data/memories/20050820-0921.mem`,
  `/data/memories/20051118-1715.mem`,
  `/data/memories/20051128-1035.mem`,
  `/data/memories/20051207-1826.mem`,
  `/data/memories/20051222-1436.mem`,
  `/data/memories/20060223-1312.mem`,
  `/data/memories/20060416-1527.mem`,
  `/data/memories/20060923-0135.mem`,
  `/data/memories/20061203-1353.mem`,
  `/data/memories/20070103-0255.mem`,
  `/data/memories/20070925-0022.mem`,
  `/data/memories/20071231-1405.mem`,
  `/data/memories/20080220-0308.mem`,
  `/data/memories/20080307-1426.mem`,
  `/data/memories/20080506-0124.mem`,
  `/data/memories/20080622-0223.mem`,
  `/data/memories/20080626-0306.mem`,
  `/data/memories/20081110-0817.mem`,
  `/data/memories/20081202-2317.mem`,
  `/data/memories/20081223-2035.mem`,
  `/data/memories/20090317-1724.mem`,
  `/data/memories/20090812-1544.mem`,
  `/data/memories/20090908-0924.mem`,
  `/data/memories/20100122-0539.mem`,
  `/data/memories/20100127-0003.mem`,
  `/data/memories/20100318-1255.mem`,
  `/data/memories/20100519-1111.mem`,
  `/data/memories/20100723-0020.mem`,
  `/data/memories/20101106-0547.mem`,
  `/data/memories/20110328-0454.mem`,
  `/data/memories/20110530-1001.mem`,
  `/data/memories/20110610-1102.mem`,
  `/data/memories/20110630-2228.mem`,
  `/data/memories/20110715-1943.mem`,
  `/data/memories/20110918-2211.mem`,
  `/data/memories/20120225-1508.mem`,
  `/data/memories/20120623-0747.mem`,
  `/data/memories/20120903-2133.mem`,
  `/data/memories/20121018-1532.mem`,
  `/data/memories/20121109-1111.mem`,
  `/data/memories/20130309-0054.mem`,
  `/data/memories/20130428-1754.mem`,
  `/data/memories/20130810-0305.mem`,
  `/data/memories/20131123-0721.mem`,
  `/data/memories/20140112-1230.mem`,
  `/data/memories/20140318-1024.mem`,
  `/data/memories/20140329-1206.mem`,
  `/data/memories/20140616-1549.mem`,
  `/data/memories/20140802-0940.mem`,
  `/data/memories/20140830-0041.mem`,
  `/data/memories/20141102-1817.mem`,
  `/data/memories/20150112-0321.mem`,
  `/data/memories/20150127-1658.mem`,
  `/data/memories/20150422-1407.mem`,
  `/data/memories/20151220-1411.mem`,
  `/data/memories/20160203-0834.mem`,
  `/data/memories/20160306-0120.mem`,
  `/data/memories/20160314-0429.mem`,
  `/data/memories/20160703-1238.mem`,
  `/data/memories/20160911-1904.mem`,
  `/data/memories/20161106-2226.mem`
];

const Text = styled.p`
  font-family: 'Anonymous Pro', monospace;
  font-size: 14px;
  padding-left: 20px;
`;

const LoadMemories = (props) => {
  const { msg } = props;
  const progress = msg.progress / NUMBER_OF_MEMORIES;
  const memoIndex = msg.progress % MEMORIES_NAMES.length;
  const memo = MEMORIES_NAMES[memoIndex];
  return (
    <Message msg={msg} progress={progress} title='Loading memories'>
      <Text>
        { (() => {
          if (progress < 1) {
            return memo;
          } else {
            return `All memories loaded`;
          }
        })() }
      </Text>
    </Message>
  )
};

export default LoadMemories;
