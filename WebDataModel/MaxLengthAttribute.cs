using System;

namespace WebDataModel
{
    internal class MaxLengthAttribute : Attribute
    {
        private int v;

        public MaxLengthAttribute(int v)
        {
            this.v = v;
        }
    }
}