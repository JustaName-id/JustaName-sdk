import React from 'react';
import { useSubname, useUpdateSubname } from '@justaname.id/react';

export interface SubnameProps {
  currentSubname: string;
}
export const Subname: React.FC<SubnameProps> = ({ currentSubname }) => {
  const { subname } = useSubname({
    subname: currentSubname
  })

  const {
    updateSubname
  } = useUpdateSubname();

  if (!subname) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>{subname?.subname}</p>

      <h2>Data</h2>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>

        {
          subname.data.textRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.key}</td>
              <td>{record.value}</td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const key = formData.get('key') as string;
        const value = formData.get('value') as string;
        updateSubname({
          username: subname.username,
          subname: subname.subname,
          ...subname.data,
          text: [
            ...subname.data.textRecords.filter(record => record.key !== key ).map((record)=>{
              return {
                key: record.key,
                value: record.value
              }
            }),
            {
              key,
              value
            }
          ],
          contentHash: subname.data.contentHash
        });
      }}>
        <input type="text" name="key" placeholder="Key" />
        <input type="text" name="value" placeholder="Value" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}