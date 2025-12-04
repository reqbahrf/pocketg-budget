interface OverviewCardProps {
  cardTitle: string;
  cardValue: string;
}

export default function OverviewCard(props: OverviewCardProps) {
  return (
    <div className='w-full bg-second-dark border border-gray-600 rounded-2xl px-4 py-4'>
      <div className='text-md text-gray-400'>{props.cardTitle}</div>
      <div className='text-2xl font-bold'>{props.cardValue}</div>
    </div>
  );
}
