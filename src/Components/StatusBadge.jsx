import React from 'react';

const StatusBadge = () => {
  const containerStyle = {
    paddingLeft: '6px',
    paddingRight: '6px',
    height: '24px',
    paddingTop: '2px',
    paddingBottom: '2px',
    backgroundColor: 'white',
    boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    borderRadius: '6px',
    borderColor: 'rgba(207, 212, 220, 1)',
    borderWidth: '1px',
    borderStyle: 'solid',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  const circleStyle = {
    width: '6px',
    height: '6px',
    backgroundColor: 'rgba(23, 178, 106, 1)',
    borderRadius: '9999px'
  };

  const innerCircleContainerStyle = {
    width: '8px',
    height: '8px',
    padding: '1px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const textStyle = {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    marginTop: '14px',
    textAlign: 'center',
    color: 'rgba(52, 64, 84, 1)'
  };

  return (
    <div style={containerStyle}>
      <div style={innerCircleContainerStyle}>
        <div style={circleStyle}></div>
      </div>
      <div style={{ width: '4px' }}></div>
      <p style={textStyle}>Active</p>
    </div>
  );
};

export default StatusBadge;
