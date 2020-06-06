import * as React from 'react';
import { Deal } from '../packs/useTabular';

interface Props {
  deal: Deal;
 }

const DealRow = ({ deal }: Props) => {
  const {
    deal_stage: dealStage,
    id,
    name,
    user,
    value,
  } = deal;

  const userName = [user.first_name, user.last_name].join(' ');
  const percentText = [dealStage.percent, '%'].join('');

  return (
    <tr>
      <td><strong>{id}</strong></td>
      <td>{userName}</td>
      <td>{name}</td>
      <td className="has-text-right">
        $
        {parseFloat(value).toFixed(2)}
      </td>
      <td>
        <span className="tag is-primary is-info">
          {dealStage.name}
        </span>
      </td>
      <td>
        <progress
          className="progress is-info"
          max={100}
          title={percentText}
          value={dealStage.percent}
        >
          {percentText}
        </progress>
      </td>
    </tr>
  );
};

export default DealRow;
